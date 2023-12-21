// src/app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.API_BASE_URL

type Payload = {
    username: string;
    email: string;
    password: string;
}

const fetchSingin = async (payload: Payload) => {
    
    

    const result = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    
    const data = await result.json();
    if (result.status !== 201) {
        return {
            message: data.detail,
            status: result.status
        }
    }


    console.log(data);

    return data;
}

const parseBody = async (req: NextRequest): Promise<Payload> => {
    const data = await req.json();

    return {
        username: data.username,
        email: data.email,
        password: data.password,
    }
    
}



export async function POST(req: NextRequest, res: NextResponse) {


    
    const payload = await parseBody(req)
    const data = await fetchSingin(payload)

    if (data.status === 201) return Response.json(data)

    return Response.json({ message: data.message}, {status: data.status})
   
    
  }
