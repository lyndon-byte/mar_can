<?php

namespace App\Http\Controllers;

use Pusher\Pusher;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Messages;
use Illuminate\Http\Request;
use App\Models\MessageThread;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class MessageController extends Controller
{
    public function index(){

        $user = Auth::user();

        $thread = MessageThread::where('thread_id',$user->id)
                          ->where('state','active')
                          ->orderBy('updated_at','desc')
                          ->get();
        
        $contacts = [];

        if($user->role === 'SuperAdmin'){

            $contacts = User::where('role','!=','SuperAdmin')->orderBy('name','asc')->get();

        }else{

            $contacts = User::where('role','=','SuperAdmin')->orderBy('name','asc')->get();
        }
  
        return Inertia::render('Messenger',[
  
              'threads' => json_decode($thread) ?? [],
              'contacts' => $contacts
         ]);
    }

    public function showArchivedThread(){

        $user = Auth::user();
 
        $archive_threads = MessageThread::where('thread_id',$user->id)
                         ->where('state','archived')   
                         ->orderBy('updated_at','desc')->get();
         
 
         return Inertia::render('Messenger',[
 
             'threads' => json_decode($archive_threads) ?? [],
            
         ]);
 
     }

     public function getSpecificThreadMessages(Request $request){

        $thread_request = $request->thread;

        $thread_state = $request->state;

        $user = Auth::user();

        $user->new_message_count = null;

        $user->save();

        $org_threads = MessageThread::where('thread_id',$user->id)
                    ->where('state', $thread_state)
                    ->orderBy('updated_at','desc')
                    ->get();

        $thread = MessageThread::find($thread_request);

        $messages = Messages::where('message_id',$thread->id)->orderBy('created_at','asc')->get();
 
        $contact_name =  $thread->recipient_name;

        $thread->timestamps = false;
        $thread->latest_message_count = 0;
        $thread->save();
        $thread->timestamps = true;

        return Inertia::render('Messenger',[
            
            'messages' => $messages,
            'threads' => json_decode($org_threads),
            'selected_thread' => $thread->recipient_email,
            'highlighted_thread' => $thread->id,
            'contact_name' => $contact_name,
          
        
        ]);


       

       
        
    }

    public function sendMessage(Request $request){


        $user = Auth::user();

        $request->validate([

            'email' => 'required|email',
            'message' => 'required'

        ]);


        $email_existence = User::where('email',$request->email)->exists();

        if(!$email_existence){

            $validator = Validator::make([], []); // Create an empty validator
            $validator->errors()->add('email', 'email not found!');
            throw new ValidationException($validator);

        }else{

            if($user->role !== 'SuperAdmin'){

                if($request->email !== 'super_admin@marcan.com'){

                    $validator = Validator::make([], []); // Create an empty validator
                    $validator->errors()->add('email', 'unable to reach '.$request->email.' please contact the admin');
                    throw new ValidationException($validator);
                }

               

            }
        }
       
        $email = $request->email;

        $message =  $request->message;

        $thread_existence = MessageThread::where('thread_id',$user->id)
                                        ->where('recipient_email',$email)
                                        ->exists();

        //get atleast 10 words from message to save as latest message due to limitation error

        $words = explode(' ', $message);

        $first10Words = array_slice($words, 0, 10);

        $latest_message_fixed = implode(' ', $first10Words);

        $avatarColors = ['default', 'primary', 'secondary', 'success', 'warning'];
                                

        if($thread_existence){

            
            $contact_name = $email;


            $get_thread = MessageThread::where('thread_id',$user->id)
                            ->where('recipient_email',$email)
                            ->get()
                            ->first();
            
            $thread = MessageThread::find($get_thread->id);

            $new_message = $thread->messages()->create([
    
                
                'message' =>  $message,
                'type' =>  'outbound',
                'sender' => $user->name,
                'time' => 'time_sent'
                
                
            ]);

            // only use this logic when receiving message
            // $thread->latest_message_count += 1;

            $thread->latest_message = $latest_message_fixed;

            $thread->save();

        }else{

            

    
            $contact_name = User::where('email',$email)->pluck('name')->first();


            $new_thread = $user->messageThread()->create([

            
                'recipient_name' =>  $contact_name,
                'recipient_email' =>  $email,
                'latest_message' => $latest_message_fixed ,
                'latest_message_count' => 1,
                'avatar_color' => $avatarColors[array_rand($avatarColors)],
                'state' => 'active',
                    
    
    
            ]);
    
            $thread = MessageThread::find($new_thread->id);
    
            $new_message = $thread->messages()->create([
    
                
                'message' =>  $message,
                'type' =>  'outbound',
                'sender' => $user->name,
                'time' => 'time_sent'
                
            ]);



        }                 

        $this->receiveMessage($email,$user->email,$message);

        return redirect()->route('get_specific_thread_messages',['thread' => $thread->id,'state' => $thread->state]);
                        
    
    }

    public function receiveMessage($receiver,$sender,$message){

        $receiver_account  = User::where('email',$receiver)->get()->first();

        $sender_account =  User::where('email',$sender)->get()->first();

        $words = explode(' ', $message);

        $first10Words = array_slice($words, 0, 10);

        $latest_message_fixed = implode(' ', $first10Words);

        $avatarColors = ['default', 'primary', 'secondary', 'success', 'warning'];

        $thread = MessageThread::where('recipient_email',$sender)
                        ->where('thread_id',$receiver_account->id)
                        ->get()
                        ->first();

        if($thread){

            $thread->latest_message = $latest_message_fixed;
            $thread->latest_message_count += 1;

            $thread->save();


            $thread->messages()->create([

                'message' => $message,
                'sender' => $sender_account->name,
                'type' => 'inbound'

            ]);

        }else{

            $newThread = $receiver_account->messageThread()->create([

                'recipient_name' =>  $sender_account->name,
                'recipient_email' =>  $sender_account->email,
                'latest_message' => $latest_message_fixed,
                'latest_message_count' => 1,
                'state' => 'active',
                'avatar_color' => $avatarColors[array_rand($avatarColors)]
            ]);

            $newThread->messages()->create([

                'message' => $message,
                'sender' => $sender_account->name,
                'type' => 'inbound'

            ]);

        }

        $receiver_account->new_message_count += 1;

        $receiver_account->save();

        $pusher = new Pusher("abf3fa130d1cb3aff19d", "c38798a2440ed206ce35", "1858189", array('cluster' => 'ap1'));

        $pusher->trigger('message-channel', 'message-received', array('receiver' => $receiver));

    }
    
    public function deleteThread(Request $request){

        $user = Auth::user();

        Messages::where('message_id',$request->id)->delete();

        $user->messageThread()->where('id',$request->id)->delete();

        return redirect()->route('messaging');
        
    }

    public function archiveThread(Request $request) {

        $thread = messageThread::find($request->thread);

        $thread->state = 'archived';

        $thread->save();

    }

    public function unArchiveThread(Request $request) {

        $thread = messageThread::find($request->thread);

        $thread->state = 'active';

        $thread->save();

    }

    public function searchThread(Request $request){
        
        

    

        $thread = messageThread::where('recipient_email','LIKE','%'. $request->search .'%')
                          ->orWhere('recipient_name','LIKE','%'. $request->search .'%')
                          ->get();
        
        if($request->search == ''){

            return redirect()->route('messaging');
                 
        }

        return Inertia::render('Messenger',[

            'threads' => json_decode($thread) ?? [],
               
        ]);

    }
}   
