"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react'

import Login from "@/app/Login"
import Item from "@/components/Item"
import AddItem from "@/components/AddItem"

export default function Items() {
    const { data: session, status } = useSession()
    const [items, setItems] = useState([] as any[])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        refreshItems()
    }, [])

    const refreshItems = () => {
        fetch('/api/items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data)
                setLoading(false)
            })
    }

    const removeItem = (itemId: number, index: number) => {
        fetch(`/api/items/${itemId}`, { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => {
                const itemsCopy = [...items]
                itemsCopy.splice(index, 1)
                setItems(itemsCopy)
            })
    }

    const updateItem = (name: string, description: string, identifier: string, callback: Function, itemId: number, index: number) => {
        const oldItem = items[index]
        if (oldItem.name !== name || oldItem.description !== description || oldItem.item_id !== identifier) {
            fetch(`/api/items/${itemId}`, { method: "PUT", body: JSON.stringify({ name, description, identifier }) })
                .then((res) => res.json())
                .then((data) => {
                    const itemsCopy = [...items]
                    itemsCopy[index] = data
                    setItems(itemsCopy)
                })
        }
        callback()
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
                <div className="skeleton h-8 w-full"></div>
            }
            {session && !isLoading && items && (
                <div>
                    <div className="bg-secondary-content flex flex-auto flex-wrap gap-4 justify-center p-4">
                        <AddItem callback={() => refreshItems()} />
                    </div>
                    <br />
                    <div className="flex flex-auto flex-wrap gap-4 justify-center">
                        {items.map((item, index) => (
                            <Item
                                item={item}
                                key={index}
                                removeItem={() => removeItem(item.id, index)}
                                updateItem={(name: string, description: string, identifier: string, callback: Function) => updateItem(name, description, identifier, callback, item.id, index)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}