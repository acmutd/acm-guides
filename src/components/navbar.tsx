// @ts-expect-error typescript blows hot ass
import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {Disclosure} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";

const links = [
    {name: "home", to: "/"},
    {name: "all docs", to: "/docs/workshops"},
];

function navLinkClass(isActive: boolean) {
    return [
        "rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all",
        "border",
        isActive
            ? "bg-white/10 text-white border-white/20"
            : "bg-transparent text-white/70 border-transparent hover:border-white/10 hover:bg-white/5 hover:text-white",
    ].join(" ");
}

export default function Navbar() {
    const [top, setTop] = useState(true);

    useEffect(() => {
        const onScroll = () => setTop(window.scrollY === 0);
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const chrome = top
        ? "bg-black/30 md:bg-transparent border-b border-transparent"
        : "bg-black/70 backdrop-blur-xl border-b border-white/10";

    return (
        <Disclosure
            as="nav"
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${chrome}`}
        >
            {({open}) => (
                <>
                    <div className="mx-0 max-w-12xl px-6 md:px-12">
                        <div className="flex h-20 items-center justify-between">

                            <Link to="/" className="group flex items-center gap-2">
                                <img
                                    className="h-10 w-auto"
                                    src="/assets/chapter-logo.png"
                                    alt="ACM Chapter Logo"
                                    width={405}
                                    height={114}
                                />
                            </Link>

                            <div className="hidden md:flex items-center gap-1">
                                {links.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        end={item.to === "/"}
                                        className={({isActive}) => navLinkClass(isActive)}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}

                                <a
                                    href="https://github.com/acmutd/acm-guides"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ml-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white/80 hover:bg-white/10 hover:text-white transition-all"
                                >
                                    github
                                </a>
                            </div>

                            <div className="md:hidden">
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 transition-all">
                                    <span className="sr-only">Open menu</span>
                                    {open ? (
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="h-5 w-5" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden bg-black/70 backdrop-blur-xl border-t border-white/10">
                        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-2">
                            {links.map((item) => (
                                <Disclosure.Button
                                    key={item.to}
                                    as={NavLink}
                                    to={item.to}
                                    end={item.to === "/"}
                                    className={({isActive}: { isActive: boolean }) =>
                                        navLinkClass(isActive)
                                    }
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
