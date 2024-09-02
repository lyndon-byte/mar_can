import React from "react";
import {Button,Tabs, Tab, Card, CardBody, Input,Textarea} from "@nextui-org/react";
import ImagePicker from "./ImagePicker";




export default function Editor() {

  return (
    <div className="flex w-full flex-col">

        <label className="mb-5">Landing Page Sections</label>

        <Tabs aria-label="Options" radius="full">
            <Tab key="hero" title="Hero">

                 <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the hero background image</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Upload the hero image
                                
                    </p>

                </header>
                
                <ImagePicker></ImagePicker>

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the hero brand</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the brand name
                                
                    </p>

                </header>
                
                <Input
                
                    
                    label="Brand Name"
                    variant="bordered"
                    className="max-w-lg"
                />

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the slogan</h2>

                        <p className="mt-1 text-sm text-gray-600 mb-4">

                            Enter the slogan
                                    
                        </p>

                </header>

                <Input


                    label="Slogan"
                    variant="bordered"
                    className="max-w-lg"

                />

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the tagline</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the tagline
                                
                    </p>

                </header>

                <Input


                    label="Tagline"
                    variant="bordered"
                    className="max-w-lg"

                />

                <Button
                    className="float-end mt-16 text-white bg-slate-800"
                    radius="sm"
                >
                    Save
                </Button>
            </Tab>
            <Tab key="services" title="Services">
                
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                   
            </Tab>
            <Tab key="about" title="About Us">
                
                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the About us page image</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Upload the image
                                
                    </p>

                </header>

                <ImagePicker></ImagePicker>

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the title</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the title
                                
                    </p>

                </header>

                <Input


                    label="Title"
                    variant="bordered"
                    className="max-w-lg"

                />

                <header>

                    <h2 className="text-lg font-medium text-gray-900 mt-4">Change the description</h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">

                        Enter the description
                                
                    </p>

                </header>

                <Textarea
                 
                    variant="bordered"
                    className="max-w-xl"
                />

                

                <Button
                    className="float-end mt-16 text-white bg-slate-800"
                    radius="sm"
                >
                    Save
                </Button>
                   
            </Tab>
            <Tab key="mission" title="Mission">
                
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  
            </Tab>
            <Tab key="vision" title="Vision">
                
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                   
            </Tab>
            <Tab key="milestone" title="Milestones">
                
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   
            </Tab>
            <Tab key="testimonial" title="Testimonials">
                
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               
            </Tab>
            <Tab key="contact" title="Contact Us">
                
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               
            </Tab>
            

        </Tabs>

    </div>  

  );
}
