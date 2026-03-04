<div style="display: flex; justify-content: center; align-items: center; min-width: 100%; min-height: 100%; background-color: navajowhite; position: absolute; inset: 0">
	<form method="POST" action="/contact" style="display: flex; flex-direction: column; gap: 3rem">
		<label>
			First Name:
			<input type="text" name="firstName" required />
		</label>

		<label>
			Last Name:
			<input type="text" name="lastName" required />
		</label>

		<button type="submit">Submit</button>
	</form>
</div>