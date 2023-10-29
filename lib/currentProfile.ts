import { auth } from "@clerk/nextjs"
import { db } from "./db"

const currentProfile = async () => {
    const {userId} = auth()
    if(!userId){
        return null
    }

    // find user with userId
    const user = await db.profile.findUnique({
        where: {
            userId
        }
    })
    return user
}
export default currentProfile