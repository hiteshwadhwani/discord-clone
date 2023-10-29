import SideNavigationbar from "@/components/navigation/SideNavigationbar"

const MainLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex w-[72px] h-full z-30 fixed inset-y-0">
                <SideNavigationbar />
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    )
}

export default MainLayout