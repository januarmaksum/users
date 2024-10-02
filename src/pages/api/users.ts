import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ error: "Error fetching users" });
    }
  } else if (req.method === "POST") {
    try {
      const { email, first_name, last_name, avatar } = req.body;

      // Check if the email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          first_name,
          last_name,
          avatar,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, email, first_name, last_name, avatar } = req.body;

      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id },
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          email,
          first_name,
          last_name,
          avatar,
        },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      const deletedUser = await prisma.user.delete({
        where: { id },
      });

      res.status(200).json(deletedUser);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Error deleting user" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
