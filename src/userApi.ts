// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import api from "./api";

// Definir los tipos de los datos que esperamos recibir
interface CreateUserRequestBody {
  name: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: string;
}

// Función que maneja la creación del usuario
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      name,
      lastName,
      password,
      email,
      phoneNumber,
      role,
    }: CreateUserRequestBody = req.body;

    try {
      // Enviar la solicitud POST para crear un nuevo usuario
      const response = await api.post("/user/register", {
        name,
        lastName,
        password,
        email,
        phoneNumber,
        role,
      });

      res
        .status(200)
        .json({ message: "User created successfully", data: response.data });
    } catch (error: any) {
      console.error(
        "Error creating user:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({ error: "Error creating user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
