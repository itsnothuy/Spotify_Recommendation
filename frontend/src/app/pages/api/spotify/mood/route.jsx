export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    try {
      // Forward the request body to your Node.js backend inside the cluster
      // This is the cluster-internal address of your Node service
      // If your Node service is named "node-backend-service" in the "default" namespace:
      const backendUrl = "http://node-backend-service.default.svc.cluster.local:80/api/spotify/mood";
  
      const backendResponse = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
        // If your Node backend expects cookies or session info, you could forward them
        // but typically "credentials" are not needed if purely internal
      });
  
      const data = await backendResponse.json();
      if (!backendResponse.ok) {
        // If Node responded with 4xx or 5xx, pass that along
        return res.status(backendResponse.status).json(data);
      }
  
      // Return the backend’s response to the client
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error proxying mood request:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  