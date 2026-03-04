import { Resend } from 'resend';

export async function onRequestPost(context: any) {
	try {
		// Инициализация клиента Resend с API-ключом из переменных окружения
		const resend = new Resend(context.env.RESEND_API_KEY);

		// Получаем данные формы
		const formData = await context.request.formData();
		const firstName = formData.get("firstName") as string;
		const lastName = formData.get("lastName") as string;

		// Отправляем письмо
		const result = await resend.emails.send({
			from: "onboarding@resend.dev", // для теста можно использовать этот адрес
			to: "gennady@roudstudio.com",
			subject: "New form submission",
			html: `<p>First Name: ${firstName}</p><p>Last Name: ${lastName}</p>`
		});

		// Возвращаем результат пользователю
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err: any) {
		return new Response("Server error: " + err.message, { status: 500 });
	}
}
