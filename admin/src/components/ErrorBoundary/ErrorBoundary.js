import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f5f5dc",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              padding: "40px",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#2d3748",
                margin: "0 0 16px 0",
              }}
            >
              Oops! Something went wrong
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#4a5568",
                margin: "0 0 16px 0",
                fontWeight: "500",
              }}
            >
              We're sorry, but something unexpected happened.
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "#718096",
                margin: "0 0 30px 0",
                lineHeight: "1.6",
              }}
            >
              Please try refreshing the page or contact support if the problem
              persists.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: "#3182ce",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(49, 130, 206, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#2c5aa0";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#3182ce";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Refresh Page
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  background: "#38a169",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(56, 161, 105, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#2f855a";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#38a169";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Go to Dashboard
              </button>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details
                style={{
                  marginTop: "30px",
                  textAlign: "left",
                  backgroundColor: "#f7fafc",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "10px",
                  }}
                >
                  Error Details (Development Mode)
                </summary>
                <pre
                  style={{
                    fontSize: "12px",
                    color: "#e53e3e",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
