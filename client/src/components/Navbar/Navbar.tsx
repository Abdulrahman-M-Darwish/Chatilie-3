"use client";
import { BsDoorOpen, BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { GiCrossedSwords } from "react-icons/gi";
import { TbArrowsExchange } from "react-icons/tb";
import { useEffect, useRef } from "react";
import { themes, links } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store";
import Link from "next/link";
import Image from "next/image";
import { User } from "types";
import { FaUserInjured } from "react-icons/fa";
import { themeChange } from "theme-change";
import { setIsDark } from "@/store/features";

const ringButton =
	"text-2xl btn btn-circle btn-ghost group-hover:text-primary group-hover:border-primary group-hover:border-2 group-hover:bg-primary-content group-hover:ring group-hover:ring-primary group-hover:ring-offset-8 group-hover:ring-offset-primary-content group-hover:animate-spin duration-700";

export const Navbar: React.FC = () => {
	const user = useAppSelector((state) => state.user) as User;
	const dialogRef = useRef<HTMLDialogElement>(null);
	const dispatch = useAppDispatch();
	useEffect(() => {
		themeChange(false);
		dispatch(
			setIsDark(
				parseInt(
					getComputedStyle(document.documentElement)
						.getPropertyValue("--b1")
						.split(" ")[2]
				) < 50
			)
		);
	}, [dispatch]);
	return (
		<nav className="Navbar w-fit sticky top-0 h-screen px-5 shadow-xl pt-4 z-50 flex flex-col">
			<div className="Logo max-lg:mx-auto w-fit">
				<Link href="/">
					<h1 className="text-4xl font-black">
						C<span className="max-lg:hidden">hati</span>
						<span className="text-primary">
							L<span className="max-lg:hidden">ie</span>
						</span>
					</h1>
				</Link>
			</div>
			<div>
				<div className="Links flex flex-col gap-3 my-4">
					{links.map((link) => (
						<Link
							key={link.name}
							href={link.path}
							className="flex group items-center hover:text-primary gap-4"
						>
							<i className={`${ringButton}`}>
								<link.icon />
							</i>
							<h2 className="max-lg:hidden">{link.name}</h2>
						</Link>
					))}
					<Link
						href={`profile/@${user.name}`}
						className="flex group items-center hover:text-primary gap-4"
					>
						<i className={`${ringButton}`}>
							<FaUserInjured />
						</i>
						<h2 className="max-lg:hidden">profile</h2>
					</Link>
				</div>
				<div className="Controls">
					<div className="Themes">
						<button
							className="flex items-center group hover:text-primary gap-4"
							onClick={() => dialogRef.current!.showModal()}
						>
							<i className={`${ringButton}`}>
								<HiOutlineColorSwatch />
							</i>
							<h2 className="max-lg:hidden">Themes</h2>
						</button>
						<dialog id="my_modal_1" className="modal" ref={dialogRef}>
							<div className="modal-action bg-base-100 h-[60vh] relative flex flex-col">
								<form
									method="dialog"
									className="bg-base-100 shadow-lg flex justify-between"
								>
									<button className={`${ringButton}`}>
										<GiCrossedSwords />
									</button>
									<button type="button" className={`${ringButton}`}>
										<BsThreeDotsVertical />
									</button>
								</form>
								<div className="flex flex-col gap-2 overflow-auto px-2 py-4">
									{themes.map((theme) => (
										<button
											key={theme}
											data-theme={theme}
											className="btn hover:bg-base-100 w-80 justify-between bg-base-100 rounded-lg outline-primary-focus transition-all"
											data-act-class="outline"
											data-set-theme={theme}
											onClick={() =>
												dispatch(
													setIsDark(
														parseInt(
															getComputedStyle(document.documentElement)
																.getPropertyValue("--b1")
																.split(" ")[2]
														) < 50
													)
												)
											}
										>
											<div className="pointer-events-none">{theme}</div>
											<div className="flex rounded-full gap-[2px] overflow-hidden pointer-events-none">
												<div className="bg-primary text-primary-content w-4 h-4 flex justify-center items-center">
													l
												</div>
												<div className="bg-secondary text-secondary-content w-4 h-4 flex justify-center items-center">
													i
												</div>
												<div className="bg-accent text-accent-content w-4 h-4 flex justify-center items-center">
													a
												</div>
												<div className="bg-neutral text-neutral-content w-4 h-4 flex justify-center items-center">
													r
												</div>
											</div>
										</button>
									))}
								</div>
							</div>
						</dialog>
					</div>
					<div className="User mt-3">
						<details className="dropdown dropdown-right">
							<summary className="flex items-center group gap-4 hover:text-secondary">
								<div
									className={
										ringButton +
										"avatar text-secondary-focus group-hover:text-secondary group-hover:ring-secondary group-hover:border-secondary group-hover:animate-none overflow-hidden"
									}
								>
									<Image
										width={50}
										height={50}
										src={user.avatar}
										alt="Avatar"
										className="rounded-full"
									/>
								</div>
								<h2 className="max-lg:hidden">{user?.username}</h2>
							</summary>
							<ul className="p-2 ml-6 -translate-y-1/2 shadow menu dropdown-content bg-base-100 rounded-box w-52 relative">
								<li>
									<a>
										<TbArrowsExchange className="text-2xl" />
										Switch Account
									</a>
								</li>
								<li>
									<a>
										<BsDoorOpen className="text-2xl" />
										Logout
									</a>
								</li>
							</ul>
						</details>
					</div>
				</div>
			</div>
		</nav>
	);
};
