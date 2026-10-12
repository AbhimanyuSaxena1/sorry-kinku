/**
 * Sends a notification event to the /api/notify endpoint.
 * Non-blocking, fails gracefully without affecting user experience.
 */
export async function notifyClick({ buttonName, pageName = "Unknown", details = "" }) {
  try {
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    });

    const payload = {
      buttonName,
      pageName,
      details: details || `Visitor clicked the "${buttonName}" button.`,
      timestamp,
      device: typeof navigator !== "undefined"
        ? `${navigator.userAgent} (Screen: ${window.innerWidth}x${window.innerHeight})`
        : "Unknown",
    };

    if (typeof window !== "undefined") {
      fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch((err) => {
        console.warn("[Notify] Request failed:", err);
      });
    }
  } catch (err) {
    console.warn("[Notify] Error:", err);
  }
}
