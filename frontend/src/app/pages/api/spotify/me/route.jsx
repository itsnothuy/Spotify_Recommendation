export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    try {
      const backendUrl = "http://node-backend-service.default.svc.cluster.local:80/api/spotify/me";
      const backendResponse = await fetch(backendUrl, {
        method: "GET",
        // Possibly forward cookies/sessions if your Node service uses them
      });
  
      const data = await backendResponse.json();
      if (!backendResponse.ok) {
        return res.status(backendResponse.status).json(data);
      }
  
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error proxying me request:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  