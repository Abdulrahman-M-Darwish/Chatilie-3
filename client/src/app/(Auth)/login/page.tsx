"use client";
import Link from "next/link";
import { useFormik } from "formik";
import { BiErrorCircle } from "react-icons/bi";
import { loginFormSchemaValidator } from "@/schemas/forms";
import { setUser } from "@/store/features";
import { useAppDispatch } from "@/store";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const LOGIN = gql`
	mutation Login($loginInput: LoginInput!) {
		login(loginInput: $loginInput) {
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

const Login: React.FC = () => {
	const [login, { loading, error }] = useMutation(LOGIN);
	const { replace } = useRouter();
	const dispatch = useAppDispatch();
	const formik = useFormik({
		validationSchema: loginFormSchemaValidator,
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ email, password }) => {
			const { data } = await login({
				variables: { loginInput: { email, password } },
			});
			dispatch(setUser(data.login));
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
						<Link href="signup" className="tab tab-lg tab-lifted">
							Signup
						</Link>
						<Link href="login" className="tab tab-lg tab-lifted tab-active">
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
									value={formik.values.email}
								/>
								{formik.touched.email && formik.errors.email && (
									<p className="flex gap-1 items-center text-error bg-error-content px-4">
										<BiErrorCircle className="text-lg" />
										{formik.errors.email}
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
									value={formik.values.password}
								/>
								{formik.touched.password && formik.errors.password && (
									<p className="flex gap-1 items-center text-error bg-error-content px-4">
										<BiErrorCircle className="text-lg" />
										{formik.errors.password}
									</p>
								)}
							</label>
						</div>
					</div>
					{error && (
						<p className="flex gap-1 items-center text-error bg-error-content px-4 capitalize rounded-box mt-4">
							<BiErrorCircle className="text-lg" />
							{error.message || "something went wrong"}
						</p>
					)}
					<button type="submit" className="btn btn-primary w-full mt-4">
						Back To Lie
						{loading && (
							<span className="loading loading-infinity loading-lg" />
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
