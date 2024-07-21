import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Badge,Button, Input,Dropdown,DropdownTrigger,DropdownMenu} from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination} from "@nextui-org/react";




export default function EmployerDashboardInterface({}){

   const [isLoading,setIsLoading] = useState(false);

   function handleRedirecToAddNewJobForm (){

        router.get('/add-new-job',{},{onStart: () => { setIsLoading(true) }, onSuccess: () => {setIsLoading(false) }});

   }

    return (

        <>

       
        
        
          <Table 
            aria-label="Example table with client side pagination"
            topContent={
                
               
                <>
                   <div className='flex gap-2 text-gray-500'>
                            
                                <Chip variant="bordered" className='p-4'>
                                    Posted jobs: <span className="text-gray-700 font-bold text-md">0</span>
                                </Chip>
                            
                                <Chip variant="bordered" className='p-4'>
                                    Applicants who applied to the posted jobs: <span className="text-gray-700 font-bold text-md">0</span>
                                </Chip>
                            
                    </div>
                    <div className="flex flex-col gap-4 mb-2">
                        <div className="flex justify-between gap-3 items-end">
                        <Input
                            isClearable
                            className="w-full sm:max-w-[44%]"
                            placeholder="Search by job title..."
                            startContent={

                                <i class="fa-solid fa-magnifying-glass"></i>
                            }
                            // value={filterValue}
                            // onClear={() => onClear()}
                            // onValueChange={onSearchChange}
                        />
                        <div className="flex gap-3">
                            <Dropdown>
                            <DropdownTrigger className="hidden sm:flex" radius="sm">
                                <Button endContent={<i class="fa-solid fa-chevron-down"></i>} variant="flat">
                                Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                // selectedKeys={statusFilter}
                                // selectionMode="multiple"
                                // onSelectionChange={setStatusFilter}
                            >
                                {/* {statusOptions.map((status) => (
                                <DropdownItem key={status.uid} className="capitalize">
                                    {capitalize(status.name)}
                                </DropdownItem>
                                ))} */}
                            </DropdownMenu>
                            </Dropdown>
                            <Dropdown>
                            <DropdownTrigger className="hidden sm:flex " radius="sm">
                                <Button endContent={<i class="fa-solid fa-chevron-down"></i>} variant="flat">
                                Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                // selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                // onSelectionChange={setVisibleColumns}
                            >
                                {/* {columns.map((column) => (
                                <DropdownItem key={column.uid} className="capitalize">
                                    {capitalize(column.name)}
                                </DropdownItem>
                                ))} */}
                            </DropdownMenu>
                            </Dropdown>
                        
                            <Tooltip content="Add new job post" className="bg-slate-900 text-white">
                                <Button 

                                    className="bg-slate-800 text-white"
                                    radius="sm" 
                                    endContent={<i class="fa-solid fa-plus"></i>}
                                    isLoading={isLoading}
                                    onPress={() => handleRedirecToAddNewJobForm()}

                                >
                                    Add New
                                </Button>
                            </Tooltip>
                        </div>
                        </div>
                        
                    </div>
                </>
             
            }
            bottomContent={
                <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="success"

                    // page={page}
                    // total={pages}
                    // onChange={(page) => setPage(page)}
                />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px] p-5",

            }}
            >
            <TableHeader>
                <TableColumn key="JOB">JOB TITLE</TableColumn>
                <TableColumn key="DESCRIPTION">DESCRIPTION</TableColumn>
                <TableColumn key="EMPLOYMENT">EMPLOYMENT TYPE</TableColumn>
                <TableColumn key="WORK">WORK SCHEDULE</TableColumn>
                <TableColumn key="START">START DATE</TableColumn>
                <TableColumn key="STATUS">STATUS</TableColumn>
                <TableColumn key="ACTIONS" className="">
                    <div className="flex justify-end pr-16">ACTIONS</div>
                </TableColumn>
            </TableHeader>
                <TableBody 
                
                    emptyContent={

                        <div className="text-center">
                            <span className="text-gray-600">no posted jobs yet </span>
                        </div>
                    }
                >
                    
                    <TableRow>
                        <TableCell> test data</TableCell>
                        <TableCell> test data</TableCell>
                        <TableCell> test data</TableCell>
                        <TableCell> test data</TableCell>
                        <TableCell> test data</TableCell>
                        <TableCell> test data</TableCell>
                       
                        <TableCell >
                        <div className="relative flex justify-end  items-center gap-2">

                                
                                <Badge content="1" color="danger">
                                     <Tooltip content="View applicants who applied" className="bg-slate-900 text-white">
                                        <Button
                                            variant="ghost"
                                            className="border-0"
                                        
                                            isIconOnly
                                        >
                                        <i class="fa-solid fa-user"></i>
                                        </Button>
                                       </Tooltip>
                                </Badge>
                               
                            
                                <Tooltip content="View Details" className="bg-slate-900 text-white">
                                       <Button
                                        variant="ghost"
                                        className="border-0"
                                     
                                        isIconOnly
                                       >
                                        <i class="fa-solid fa-eye"></i>
                                       </Button>
                                </Tooltip>
                                <Tooltip content="Edit Details" className="bg-slate-900 text-white">
                                       <Button
                                        variant="ghost"
                                        className="border-0"
                                     
                                        isIconOnly
                                       >
                                       <i class="fa-solid fa-pen-to-square"></i>
                                       </Button>
                                </Tooltip>
                                <Tooltip content="Delete" className="bg-slate-900 text-white">
                                       <Button
                                        variant="ghost"
                                        className="border-0"
                                        color="danger"
                                        isIconOnly
                                       >
                                        <i class="fa-solid fa-trash"></i>
                                       </Button>
                                </Tooltip>
                                
                        </div>
                           

                        </TableCell>
                    </TableRow>
                  
                </TableBody>
            </Table>
                
                                    
          
                
        </>
    )

}