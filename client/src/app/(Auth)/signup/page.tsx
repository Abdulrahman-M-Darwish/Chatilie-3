"use client";
import Link from "next/link";
import { useFormik } from "formik";
import { BiErrorCircle } from "react-icons/bi";
import { signupFormSchemaValidator } from "@/schemas/forms";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/features";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const SIGNUP = gql`
	mutation Signup($signupInput: SignupInput!) {
		signup(signupInput: $signupInput) {
			id
			name
			email
			isActive
			avatar
			birthDate
			username
		}
	}
`;

const year = new Date().getFullYear();

const Signup: React.FC = () => {
	const [signup, { loading, error }] = useMutation(SIGNUP);
	const { replace } = useRouter();
	const dispatch = useAppDispatch();
	const formik = useFormik({
		validationSchema: signupFormSchemaValidator,
		initialValues: {
			email: "",
			name: "",
			username: "",
			password: "",
			confirmPassword: "",
			gender: "gender",
			year: "year",
			month: "month",
			day: "day",
			conditions: "",
		},
		onSubmit: async ({
			email,
			name,
			password,
			day,
			year,
			month,
			username,
			gender,
		}) => {
			const avatar = `https://api.dicebear.com/6.x/pixel-art/svg?${
				gender === "MALE"
					? "beardProbability=50&glassesProbability=50"
					: "accessoriesProbability=75"
			}&hatProbability=50&seed=${name}`;
			const birthDate = new Date(
				`${year} ${month} ${day}`
			).toISOString() as unknown as Date;
			const { data } = await signup({
				variables: {
					signupInput: { email, name, password, birthDate, avatar, username },
				},
			});
			dispatch(setUser(data.signup));
			formik.resetForm();
			replace("/");
		},
	});
	return (
		<div className="flex sm:flex-1 justify-center max-sm:min-h-screen">
			<form
				className="form-control flex-1 justify-center p-4 max-sm:mt-4 sm:p-6 max-w-lg"
				onSubmit={formik.handleSubmit}
			>
				<div className="sm:p-4 sm:border-4 border-base-300 rounded-box">
					<div className="tabs">
						<Link href="signup" className="tab tab-lg tab-lifted tab-active">
							Signup
						</Link>
						<Link href="login" className="tab tab-lg tab-lifted">
							Login
						</Link>
					</div>
					<div className="p-2 sm:p-4 border-4 border-base-300 space-y-4 rounded-box rounded-tl-none">
						<div>
							<label className="input-group input-group-vertical">
								<span>Email</span>
								<input
									type="text"
									name="email"
									placeholder="Email"
									className="input input-bordered"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
								/>
								{formik.touched.email && formik.errors.email && (
									<p className="flex gap-1 items-center text-error bg-error-content px-4 capitalize">
										<BiErrorCircle className="text-lg" />
										{formik.errors.email}
									</p>
								)}
							</label>
						</div>
						<div>
							<label className="input-group input-group-vertical">
								<span>Name</span>
								<input
									type="text"
									name="name"
									placeholder="Name"
									className="input input-bordered"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.name}
								/>
								{formik.touched.name && formik.errors.name && (
									<p className="flex gap-1 items-center text-error bg-error-content px-4 capitalize">
										<BiErrorCircle className="text-lg" />
										{formik.errors.name}
									</p>
								)}
							</label>
						</div>
						<div>
							<label className="input-group input-group-vertical">
								<span>Username</span>
								<input
									type="text"
									name="username"
									placeholder="Username"
									className="input input-bordered"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.username}
								/>
								{formik.touched.username && formik.errors.username && (
									<p className="flex gap-1 items-center text-error bg-error-content px-4 capitalize">
										<BiErrorCircle className="text-lg" />
										{formik.errors.username}
									</p>
								)}
							</label>
						</div>
						<div>
							<label className="input-group input-group-vertical">
								<span>Password</span>
								<input
									type="password"
									name="password"
									placeholder="Password"
									className="input input-bordered"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.password}
								/>
								{formik.touched.password && formik.errors.password && (
									<p className="flex gap-1 items-center text-error bg-error-content px-4 capitalize">
										<BiErrorCircle className="text-lg" />
										{formik.errors.password}
									</p>
								)}
							</label>
						</div>
						<div>
							<label className="input-group input-group-vertical">
								<span>Confirm Password</span>
								<input
									type="password"
									name="confirmPassword"
									placeholder="Confirm Password"
									className="input input-bordered"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.confirmPassword}
								/>
								{formik.touched.confirmPassword &&
									formik.errors.confirmPassword && (
										<p className="flex gap-1 items-center text-error bg-error-content px-4 capitalize">
											<BiErrorCircle className="text-lg" />
											{formik.errors.confirmPassword}
										</p>
									)}
							</label>
						</div>
						<div>
							<label className="input-group input-group-vertical">
								<span>Gender</span>
								<select
									name="gender"
									className="select select-bordered rounded-none flex-1 focus:outline-none"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.gender}
								>
									<option disabled value="gender">
										Gender
									</option>
									<option value="MALE">Male</option>
									<option value="FEMALE">Female</option>
								</select>
								{formik.touched.gender && formik.errors.gender && (
									<p className="flex gap-1 items-center text-error bg-error-content px-4 capitalize">
										<BiErrorCircle className="text-lg" />
										{formik.errors.gender}
									</p>
								)}
							</label>
						</div>
						<div>
							<label className="input-group input-group-vertical">
								<span>Age</span>
								<div className="flex">
									<select
										name="year"
										className="select rounded-t-none select-bordered rounded-none flex-1 focus:outline-none"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.year}
									>
										<option disabled value="year">
											Year
										</option>
										{[...Array(80)].map((ele, i) => (
											<option value={year - 5 - i} key={i}>
												{year - 5 - i}
											</option>
										))}
									</select>
									<select
										name="month"
										className="select select-bordered rounded-none flex-1 focus:outline-none"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.month}
									>
										<option disabled value="month">
											Month
										</option>
										{[...Array(12)].map((ele, i) => (
											<option value={i + 1} key={i}>
												{i + 1}
											</option>
										))}
									</select>
									<select
										name="day"
										className="select select-bordered rounded-none flex-1 focus:outline-none"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.day}
									>
										<option disabled value="day">
											day
										</option>
										{[...Array(31)].map((ele, i) => (
											<option value={i + 1} key={i}>
												{i + 1}
											</option>
										))}
									</select>
								</div>
								{formik.touched.day &&
									formik.touched.month &&
									formik.touched.year &&
									(formik.errors.day ||
										formik.errors.month ||
										formik.errors.year) && (
										<p className="flex gap-1 items-center text-error bg-error-content px-4 capitalize">
											<BiErrorCircle className="text-lg" />
											{formik.errors.year}
											{formik.errors.month}
											{formik.errors.day}
										</p>
									)}
							</label>
						</div>
					</div>
					<div className="form-control my-2">
						<label className="label cursor-pointer">
							<span className="label-text">No Terms and Conditions</span>
							<input
								type="checkbox"
								name="conditions"
								className="checkbox checkbox-primary"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.conditions}
							/>
						</label>
						{formik.touched.conditions && formik.errors.conditions && (
							<p className="flex gap-1 items-center text-error bg-error-content px-4 capitalize">
								<BiErrorCircle className="text-lg" />
								{formik.errors.conditions}
							</p>
						)}
					</div>
					{error && (
						<p className="flex gap-1 items-center text-error bg-error-content px-4 capitalize rounded-box">
							<BiErrorCircle className="text-lg" />
							{error.message || "something went wrong"}
						</p>
					)}
					<button type="submit" className="btn btn-primary w-full mt-4">
						Become A Liar
						{loading && (
							<span className="loading loading-infinity loading-lg" />
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Signup;
