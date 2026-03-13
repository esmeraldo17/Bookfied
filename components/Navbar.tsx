'use client'
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Show, UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

const navItems = [
    {label: "Library", href: "/"},
    {label: "Add New", href: "/books/new"}
]

const  Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();
    return (
        <header className="w-full fixed z-50 bg-('--bg-primary')">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href="/" className="flex gap-0.5 items-center">
                    <Image src="/assets/logo.png" alt="Bookified Logo" width={42} height={26}/>
                    <span className="logo-text">Bookified</span>
                </Link>

                <nav className="w-fit flex gap-7.5 items-center">
                    {navItems.map(({ label, href}) => {
                        const isActive = pathName === href || (href !== "/" && pathName.startsWith(href));
                        return (
                            <Link key={label} href={href} className={cn("nav-link-base", isActive ? 'nav-link-active' : "text-black hover:opacity-70")}>
                                {label}
                            </Link>
                        );
                    })}

                    <div className="flex items-center gap-3">
                        <Show when="signed-out">
                            <SignInButton>
                                <button className="btn">Sign in</button>
                            </SignInButton>
                            {/* <SignUpButton>
                                <button className="btn-outline">Sign up</button>
                            </SignUpButton> */}
                        </Show>

                        <Show when="signed-in">
                            <div className="nav-user-link">
                                <UserButton />
                                {user?.firstName &&(
                                    <Link href="/subscriptions" className="nav-user-name">
                                        {user.firstName}
                                    </Link>
                                )}
                            </div>
                        </Show>
                    </div>
                    
                </nav>
            </div>
        </header>
    )
}

export default Navbar;

export function NavbarWithAuth() {
    const pathName = usePathname();
    return (
        <header className="w-full fixed z-50 bg-('--bg-primary')">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href="/" className="flex gap-0.5 items-center">
                    <Image src="/assets/logo.png" alt="Bookified Logo" width={42} height={26}/>
                    <span className="logo-text">Bookified</span>
                </Link>

                <nav className="w-fit flex gap-7.5 items-center">
                    {navItems.map(({ label, href}) => {
                        const isActive = pathName === href || (href !== "/" && pathName.startsWith(href));
                        return (
                            <Link key={label} href={href} className={cn("nav-link-base", isActive ? 'nav-link-active' : "text-black hover:opacity-70")}>
                                {label}
                            </Link>
                        );
                    })}

                    
                </nav>
            </div>
        </header>
    );
}