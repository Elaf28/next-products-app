import dbConnect from "@/lib/mongodb"

const page = async () => {
  await dbConnect()
  return (
    <main>
      <h1>Database Connection Successful!</h1>
      <p>Next.js is now communicating with MongoDB via Mongoose.</p>
    </main>
  )
}

export default page