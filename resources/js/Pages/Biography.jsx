import { Link, Head } from '@inertiajs/react';


export default function Biography(){

    return (

        <>
            <Head title='Nestor Aprechio'></Head>
            <header class="bg-green-600 text-white p-6">
    <div class="container mx-auto">
      <h1 class="text-xl font-bold">Biography</h1>
    </div>
  </header>


 
  
  <section class="container mx-auto p-6">
  <nav class="bg-white p-3 rounded-md w-full mb-5">
    <ol class="list-reset flex">
      <li>
        <a href="/" class="text-green-600 hover:text-green-700">Home</a>
      </li>
      <li><span class="mx-2 text-gray-500">/</span></li>
      <li>
        <a href="#" class="text-gray-600 hover:text-gray-700">Biography</a>
      </li>
     
    </ol>
  </nav>
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex items-center">
        <img class="w-24 h-24 rounded-full mr-6" src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg" alt="Profile Picture"/>
        <div>
          <h2 class="text-2xl font-bold text-green-600">Nestor Diamante Aprecio</h2>
          <p class="text-gray-600">Consultant / Ceo of Marcan Visa Consultancy</p>
        </div>
      </div>
      <p class="mt-7 text-slate-500">Mr. Nestor Diamante Aprecio has been honed and toughened by life even when he was at school. Typical school days during his elementary days was marked by walking at least 8 kilometers. His high school was punctuated by getting an <span className='font-bold text-slate-600'>almost-perfect score of 99% with NCEE thereby topping the graduating class of his high school on this particular exam.</span> </p>
      <p class="mt-7 text-slate-500"> He used this <span className='font-bold text-slate-600'> NCEE Topnotcher score to get a scholarship for his tertiary education.</span> He became a 100% scholar throughout his college years at UNO-R. He got a short 3-semester stint at USLS but decided to go back to UNO-R and finish his BS Philosophy Degree there.</p>
      <p class=" text-slate-500">The Philosohy that is behind his current success is based on the tenets of BAYANIHAN. He believes that acting is one something is done but acting as a community, then a lot get things done.</p>

    </div>
  </section>

  
  <section class="container mx-auto p-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-xl font-bold mb-4 text-slate-600">Achievements</h3>
      <ul class="list-inside space-y-2">
       
        <li className='flex'>
           <i class="fa-solid text-green-600 fa-circle-dot mt-1"></i>
           &nbsp; &nbsp;
           <p className='text-slate-700'>Achieved an almost-perfect score of 99% in the NCEE, topping his high school graduating class.</p> 
        </li>
        <li className='flex'>
           <i class="fa-solid text-green-600 fa-circle-dot mt-1"></i>
           &nbsp; &nbsp;
           <p className='text-slate-700'>Used his NCEE top score to obtain a scholarship for tertiary education.</p> 
        </li>
        <li className='flex'>
           <i class="fa-solid text-green-600 fa-circle-dot mt-1"></i>
           &nbsp; &nbsp;
           <p className='text-slate-700'>Maintained a 100% scholarship throughout college at UNO-R.</p> 
        </li>
        <li className='flex'>
           <i class="fa-solid text-green-600 fa-circle-dot mt-1"></i>
           &nbsp; &nbsp;
           <p className='text-slate-700'>Completed a BS Philosophy Degree at UNO-R after a brief 3-semester stint at USLS.</p> 
        </li>
        <li className='flex'>
           <i class="fa-solid text-green-600 fa-circle-dot mt-1"></i>
           &nbsp; &nbsp;
           <p className='text-slate-700'>Began a career at Wyeth Pharmaceuticals and progressed to executive-level positions at multinational companies such as Solvay Pharma, Johnson & Johnson Distributor, and Philip Morris Philippines Manufacturing Inc.</p> 
        </li>
        <li className='flex'>
           <i class="fa-solid text-green-600 fa-circle-dot mt-1"></i>
           &nbsp; &nbsp;
           <p className='text-slate-700'>Received various awards and promotions, achieving the Distributor Executive level at Philip Morris.</p> 
        </li>

         
     
      </ul>
    </div>
  </section>


        </>
    )

}

