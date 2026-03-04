import { Resend } from 'resend';

const resend = new Resend(context.env.RESEND_API_KEY);

export async function onRequestPost(context: any) {
	try {
		const formData = await context.request.formData();
		const firstName = formData.get("firstName") as string;
		const lastName = formData.get("lastName") as string;

		const result = await resend.emails.send({
			from: "onboarding@resend.dev", // для теста можно использовать этот адрес
			to: "gennady@roudstudio.com",
			subject: "New form submission",
			html: `<p>First Name: ${firstName}</p><p>Last Name: ${lastName}</p>`
		});

		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response("Server error", { status: 500 });
	}
}
