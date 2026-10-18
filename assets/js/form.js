const MIN_FILL_MS = 3000;
const COOLDOWN_MS = 60000;
const REQUEST_TIMEOUT_MS = 15000;
const COOLDOWN_KEY = "choyinko:contact:last";
const DEFAULT_TOKEN_KEY = "choyinko:cognito:idToken";

const ALLOWED_SUBJECTS = new Set([
  "consulta",
  "voluntariado",
  "alianzas",
  "prensa",
  "otro",
]);

function readStorage(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch {
    // El almacenamiento puede estar bloqueado; el envío continúa.
  }
}

export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector("[data-submit]");
  const startedAt = form.querySelector("[data-form-started-at]");
  const tokenKey = form.dataset.cognitoTokenKey || DEFAULT_TOKEN_KEY;

  const fields = [...form.querySelectorAll("input, select, textarea")].filter(
    (field) =>
      field.name &&
      field.name !== "website" &&
      field.type !== "hidden",
  );

  let submitted = false;

  if (startedAt) startedAt.value = String(Date.now());

  const setStatus = (message, state) => {
    if (!status) return;
    status.textContent = message;

    if (state) {
      status.dataset.state = state;
    } else {
      delete status.dataset.state;
    }
  };

  const syncFieldValidity = (field) => {
    if (field.validity.valid) {
      field.removeAttribute("aria-invalid");
    } else {
      field.setAttribute("aria-invalid", "true");
    }
  };

  const clearValidity = () => {
    fields.forEach((field) => field.removeAttribute("aria-invalid"));
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (submitted) syncFieldValidity(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitted = true;
    fields.forEach(syncFieldValidity);

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    if (String(data.get("website") || "").trim()) {
      setStatus("No se pudo enviar el mensaje.", "error");
      return;
    }

    const started = Number(startedAt?.value || 0);
    if (!started || Date.now() - started < MIN_FILL_MS) {
      setStatus("Espera un momento antes de enviar.", "error");
      return;
    }

    const last = Number(readStorage(localStorage, COOLDOWN_KEY) || 0);
    if (Date.now() - last < COOLDOWN_MS) {
      setStatus(
        "Ya enviaste un mensaje hace poco. Intenta nuevamente más tarde.",
        "error",
      );
      return;
    }

    const endpoint = (form.dataset.endpoint || "").trim();
    if (!endpoint) {
      setStatus(
        "El formulario aún no está configurado. Escríbenos a contacto@fundacionchoyinko.org.",
        "error",
      );
      return;
    }

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      subject: String(data.get("subject") || "").trim(),
      message: String(data.get("message") || "").trim(),
      consent: data.get("consent") === "on",
      startedAt: started,
    };

    if (
      payload.name.length < 2 ||
      payload.name.length > 80 ||
      payload.email.length > 120 ||
      payload.phone.length > 30 ||
      payload.message.length < 20 ||
      payload.message.length > 1200 ||
      !ALLOWED_SUBJECTS.has(payload.subject)
    ) {
      setStatus("Revisa los datos ingresados.", "error");
      return;
    }

    submit?.setAttribute("disabled", "");
    submit?.setAttribute("aria-busy", "true");
    form.setAttribute("aria-busy", "true");
    setStatus("Enviando…", null);

    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS,
    );

    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const token = readStorage(sessionStorage, tokenKey);
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        credentials: "omit",
        mode: "cors",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      writeStorage(localStorage, COOLDOWN_KEY, String(Date.now()));
      form.reset();
      submitted = false;
      clearValidity();
      if (startedAt) startedAt.value = String(Date.now());
      setStatus("Mensaje enviado. Gracias por escribirnos.", "success");
    } catch (error) {
      const timedOut = error?.name === "AbortError";
      setStatus(
        timedOut
          ? "La solicitud tardó demasiado. Intenta nuevamente."
          : "No pudimos enviar el mensaje. Intenta nuevamente o escríbenos por correo.",
        "error",
      );
    } finally {
      window.clearTimeout(timeout);
      submit?.removeAttribute("disabled");
      submit?.removeAttribute("aria-busy");
      form.removeAttribute("aria-busy");
    }
  });
}
