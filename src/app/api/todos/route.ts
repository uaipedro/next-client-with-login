// route api component for todos, nextjs

import { NextRequest, NextResponse } from "next/server"
import Cookies from 'universal-cookie'

const API_BASE_URL = process.env.API_BASE_URL

type Payload = {
    title: string;
    description: string;
    state: string;
}

const fetchTodos = async (token: string) => {
        
        
    const result = await fetch(`${API_BASE_URL}/todos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
    
    const data = await result.json();
    if (result.status !== 200) {
        return {
            message: data.detail,
            status: result.status
        }
    }

    return {data, status: result.status};

}

export async function GET(req: NextRequest, res: NextResponse) {

        const token = req.cookies.get('token')
        console.log('token',token?.value)

        if (!token) {
            return Response.json({ message: 'Not authorized'}, {status: 401})
        }
    
        const {data, status} = await fetchTodos(token.value)

        console.log('data', data)
    
        if (status === 200) return Response.json(data)
    
        return Response.json({ message: data.message}, {status: status})
}