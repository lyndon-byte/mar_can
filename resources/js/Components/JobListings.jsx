import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"
import {Listbox, ListboxItem, Pagination} from "@nextui-org/react";
import {Button,Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Avatar} from "@nextui-org/react";




export default function JobListings({postedJobs}){

   const [buttonLoading,setButtonLoading] = useState(false);
 
   
   function handlePageChange(page){

        router.get('/dashboard',{page},{preserveState: true})
  
   }

   function handleViewingFullPostedJobDetails(id){

        router.get('/view-posted-job-full-details',{id:id})

   }

   // provides color for org avatar

   function letterToColor(str) {

        var letter = str.charAt(0).toUpperCase();

        var colors = {

                A: "default",
                B: "success",
                C: "primary",
                D: "secondary",
                E: "warning",
                F: "danger",
                G: "default",
                H: "success",
                I: "primary",
                J: "secondary",
                K: "warning",
                L: "danger",
                M: "default",
                N: "success",
                O: "primary",
                P: "secondary",
                Q: "warning",
                R: "danger",
                S: "default",
                T: "success",
                U: "primary",
                V: "secondary",
                W: "warning",
                X: "danger",
                Y: "default",
                Z: "success",
        };
      
        return colors[letter.toUpperCase()] || "#000000"; // Default to black if no match

      };
  

    return (

            <div>

                      

                        {

                                postedJobs === null ? (

                                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                                <div className="p-24 m-auto text-3xl  text-gray-900" >
                                
                                
                                
                                                        <span className='text-xl text-gray-600'>All available job listings will be shown on this page. If you are seeing this message, it means that no employers have posted job openings yet.&nbsp;<i class="fa-brands fa-canadian-maple-leaf text-2xl"></i> </span>
                                                
                                        
                
                                                </div>
                                        </div>
                                        
                                ) : (

                                        
                                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                                                <div className="p-4 sm:p-8 ">


                                                        <Listbox

                                                                items={postedJobs.data}
                                                                topContent={

                                                                      <p className="text-2xl mb-10">All jobs {'(' + postedJobs.total + ')'}</p>
                                                                }
                                                                bottomContent={
                                                                    <div className="flex w-full rounded-lg p-5 justify-center mt-5 bg-white ">
                                                                        <Pagination
                                                                                isCompact
                                                                                showControls
                                                                                showShadow
                                                                                radius="sm"
                                                                                color="primary"
                                                                                total={postedJobs.last_page}
                                                                                initialPage={postedJobs.current_page}
                                                                                onChange={handlePageChange}
                                                                        />
                                                                     </div>
                                                                }

                                                                // onAction={(key) => alert(key)}
                                                        >
                                                                
                                                                {(item) => (

                                                                        <ListboxItem 

                                                                            key={item.id}
                                                                            className="bg-white mb-3 p-5 "
                                                                            shouldHighlightOnFocus={false}
                                                                        >
                                                                        
                                                                                <Card className="w-full shadow-none">
                                                                                
                                                                                        <CardHeader className="flex gap-3">
                                                                                                <Avatar name={item.user.org_information.org_name} color={letterToColor(item.user.org_information.org_name)} />
                                                                                                <div className="flex flex-col">
                                                                                                <p className="text-md">{item.user.org_information.org_name}</p>
                                                                                                <p className="text-small text-default-500">{ item.user.org_information.org_city + " " + item.user.org_information.org_province}</p>
                                                                                                </div>
                                                                                        </CardHeader>
                                                                                        <Divider/>      
                                                                                        <CardBody className="">
                                                                                                <div class="flex-1  mt-3">
                                                                                                        
                                                                                                        <h2 class="text-2xl font-semibold mb-3"><i class="fa-solid fa-briefcase"></i>&nbsp; {item.job_title}</h2>
                                                                                                        <p class="text-gray-700 mb-3 text-lg font-medium"><i class="fa-solid fa-location-dot"></i>&nbsp; {item.location}</p>
                                                                                                        
                                                                                                        
                                                                                                             {

                                                                                                                item.required_experiences.length !== 0 && (
                                                                                                                        
                                                                                                                    <>
                                                                                                                        <span className="text-lg font-medium">Experiences: </span>

                                                                                                                         {

                                                                                                                                item.required_experiences.map((element) =>(

                                                                                                                                        <p class="text-gray-700 mb-3 mt-3">{"-" + element.experience + ", "}</p>

                                                                                                                                ))
                                                                                                                         }

                                                                                                                    </>

                                                                                                                ) 

                                                                                                             }

                                                                                                            {

                                                                                                                  item.required_skills.length !== 0 && (
                                                                                                                                
                                                                                                                                <>
                                                                                                                                        <span className="text-lg font-medium">skills: </span>

                                                                                                                                        {

                                                                                                                                                item.required_skills.map((element) =>(

                                                                                                                                                        <p class="text-gray-700 mb-1 mt-3">{"-" + element.skill + ", "}</p>

                                                                                                                                                ))
                                                                                                                                        }

                                                                                                                                </>

                                                                                                                   ) 

                                                                                                                }
                                                                                                        
                                                                                                        <p class="text-gray-700 text-lg mt-5 mb-3"><i class="fa-solid fa-dollar-sign"></i> {item.salary !== null ?  item.salary : ' Salary was not mentioned'}</p>
                                                                                                </div>
                                                                                        </CardBody>
                                                                                        <Divider/>
                                                                                        <CardFooter>
                                                                                              <Button 
                                                                                                className="mt-2 bg-slate-800 text-white"
                                                                                                radius="sm"
                                                                                                isLoading={buttonLoading}
                                                                                                onPress={() => handleViewingFullPostedJobDetails(item.id)}
                                                                                              >
                                                                                                <i class="fa-solid fa-eye"></i> View full details
                                                                                              </Button>
                                                                                        </CardFooter>
                                                                                </Card>

                                                                        </ListboxItem>
                                                                
                                                                )}

                                                        </Listbox>


                     
                                                </div>

                                        </div>


                                        
                                )

                        }
                                        
                      
            </div>

    )
}