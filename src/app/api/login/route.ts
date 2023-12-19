import { NextRequest, NextResponse } from "next/server"


export async function GET() {

   
    return Response.json({ message: 'Hello world' })
  }


type Payload = {
    username: string;
    password: string;
}

const fetchLogin = async (payload: Payload) => {
    const formData = new URLSearchParams();
    
    for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
            formData.append(key, payload[key as keyof Payload]);
        }
    }

    const result = await fetch('http://localhost:8000/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    });

    const data = await result.json();

    console.log(data);

    return data;
}

const parseBody = async (req: NextRequest): Promise<Payload> => {
    const data = await req.json();

    return {
        username: data.email,
        password: data.password
    }
    
}

const checkToken = (data: any) => {
    if (data.access_token) {
        return true
    }
    return false
}

export async function POST(req: NextRequest, res: NextResponse) {


    
    const payload = await parseBody(req)
    const data = await fetchLogin(payload)

    if (checkToken(data)) return Response.json(data)

    return Response.json({ message: 'Invalid credentials' }, { status: 401 })
   
    
  }