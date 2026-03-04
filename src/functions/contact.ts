// Эта функция будет вызвана, когда форма отправит POST-запрос на /contact
export async function onRequestPost(context: any) {
	try {
		// Получаем данные формы из запроса
		const formData = await context.request.formData();

		// Извлекаем значения полей
		const firstName = formData.get("firstName") as string;
		const lastName = formData.get("lastName") as string;

		// Отправляем письмо через Resend API
		const resp = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				// API-ключ хранится в переменных окружения Cloudflare Pages
				"Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				from: "no-reply@roudstudio.com", // адрес отправителя
				to: "gennady@roudstudio.com",   // твой email
				subject: "New form submission", // тема письма
				html: `<p>First Name: ${firstName}</p><p>Last Name: ${lastName}</p>` // содержимое письма
			})
		});

		// Проверяем результат
		if (!resp.ok) {
			return new Response("Error sending email", { status: 500 });
		}

		// Ответ пользователю
		return new Response("Form submitted successfully!", { status: 200 });
	} catch (err) {
		// Если что-то пошло не так
		return new Response("Server error", { status: 500 });
	}
}
