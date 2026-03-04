export async function onRequestPost(context: any) {
	try {
		const formData = await context.request.formData();
		const firstName = formData.get("firstName") as string;
		const lastName = formData.get("lastName") as string;

		const resp = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				from: "no-reply@roudstudio.com",
				to: "gennady@roudstudio.com",
				subject: "New form submission",
				html: `<p>First Name: ${firstName}</p><p>Last Name: ${lastName}</p>`
			})
		});

		if (!resp.ok) {
			return new Response("Error sending email", { status: 500 });
		}

		return new Response("Form submitted successfully!", { status: 200 });
	} catch (err) {
		return new Response("Server error", { status: 500 });
	}
}
