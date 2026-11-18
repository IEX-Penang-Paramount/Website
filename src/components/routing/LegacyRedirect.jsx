import { Navigate, generatePath, useParams } from "react-router-dom";

/** Sends a pre-project URL to its new home, carrying the route params over. */
function LegacyRedirect({ to }) {
  return <Navigate to={generatePath(to, useParams())} replace />;
}

export default LegacyRedirect;
