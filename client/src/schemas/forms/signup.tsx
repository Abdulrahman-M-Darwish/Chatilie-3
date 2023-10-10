import * as Yup from "yup";

export const signupFormSchemaValidator = Yup.object({
	email: Yup.string()
		.required('Required :">')
		.matches(/^.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid Email"),
	name: Yup.string()
		.required('Required :">')
		.min(3)
		.max(40)
		.transform((o, v: string) => v.trim()),
	password: Yup.string()
		.required('Required :">')
		.min(8)
		.matches(/[A-Z]+/, "Password Must Contains At least 1 upper case character")
		.matches(/[a-z]+/, "Password Must Contains At least 1 lower case character")
		.matches(/[0-9]+/, "password must contain strings")
		.matches(/(?=.*[@$!%*#?&])/, "password must symbolize")
		.transform((o, v: string) => v.trim()),
	confirmPassword: Yup.string()
		.required('Required :">')
		.equals([Yup.ref("password")], "Not The Same Password"),
	gender: Yup.string()
		.required('Required :">')
		.oneOf(["MALE", "FEMALE"], "male? female? freak?"),
	year: Yup.string().required('Required :">').not(["year"], "year Required."),
	month: Yup.string()
		.required('Required :">')
		.not(["month"], "month Required."),
	day: Yup.string().required('Required :">').not(["day"], "day Required."),
	conditions: Yup.boolean().required('Required :">'),
});
