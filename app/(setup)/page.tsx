import InitialModal from "@/components/modals/intialModal"
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/intitalProfile"
import {redirect} from 'next/navigation'

const SetUpPage = async () => {
    const profile = await initialProfile()

    // find the first server where profile is a member
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`)
    }
    return (
       <InitialModal />
    )
}
export default SetUpPage