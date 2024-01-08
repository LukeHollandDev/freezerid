"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'

import Login from "@/app/Login"
import Item from "@/components/Item"


export default function Items() {
    const { data: session, status } = useSession()
    const [items, setItems] = useState([] as any[])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data)
                setLoading(false)
            })
    }, [])

    const removeItem = (itemId: number, index: number) => {
        fetch(`/api/items/${itemId}`, { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => {
                const itemsCopy = [...items]
                itemsCopy.splice(index, 1)
                setItems(itemsCopy)
            })
    }

    return (
        <div>
            {!session &&
                <div className="hero">
                    <div className="hero-content text-center">
                        {status === 'loading' &&
                            <div className="max-w-md">
                                <div className="flex flex-col gap-4 w-56">
                                    <div className="skeleton h-12 w-48 mx-auto"></div>
                                    <div className="skeleton h-16 w-full"></div>
                                    <div className="skeleton h-8 w-full"></div>
                                </div>
                            </div>
                        }
                        {status !== 'loading' &&
                            <div className="max-w-md">
                                <h1 className="text-4xl font-bold">Your Meals</h1>
                                <p className="py-6">You'll be able to see your meals below once you login or sign-up to Freezer ID.</p>
                                <Login />
                            </div>
                        }
                    </div>
                </div>
            }
            {session && isLoading &&
                <div className="text-center">Loading your items!</div>
            }
            {session && !isLoading && items && (
                <div className="flex flex-auto flex-wrap gap-4 justify-center">
                    {items.map((item, index) => (
                        <Item item={item} key={index} removeItem={() => removeItem(item.id, index)} />
                    ))}
                </div>
            )}
        </div>
    )
}