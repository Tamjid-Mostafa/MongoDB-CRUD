import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Text from './Text'

const Form = ({ setFirst, handleSubmit, handleUpdate, refetch, first, userId }) => {


    const SubmitData = () => {
        handleSubmit(),
            refetch()
    }

    return (
        <div className='flex flex-col w-[60vw] mb-20'>
            <div className='text-center mt-20'>
                <Text variant='heading'>
                    User App
                </Text>
            </div>
            <div className='flex flex-col  justify-start space-y-[46px]'>
                <div className='flex flex-col gap-5'>
                    <div className=''>
                        <Text>
                            Name
                        </Text>
                        <Input
                            value={first.name}
                            name= 'name'
                            type="text"
                            onChange={setFirst} />
                    </div>
                    <div className=''>
                        <Text>
                            Email
                        </Text>
                        <Input
                            value={first.email}
                            name= 'email'
                            type="email"
                            variant='input' onChange={setFirst} />
                    </div>
                    <div className='col-span-2 text-center my-10'>
                        {
                            userId === "" ?
                                <Button
                                    onClick={SubmitData}
                                    className='rounded-full' variant='slim'>
                                    Submit
                                </Button>
                                :
                                <Button
                                    onClick={handleUpdate}
                                    className='rounded-full' variant='slim'>
                                    Update
                                </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form