function Alert({ message, type }: {message: string, type: "red" | "green"}) {

    const divStyle = {
      color: type === "red" ? "#721C24" : "#155724",
      backgroundColor: type === "red" ? "#F8D7DA" : "#D4EDDA",
      padding: "10px",
      margin: "10px 0px",
      borderRadius: "5px",
      border: type === "red" ? "1px solid #721C24" : "1px solid #155724",
    };

    return (
      <div style={divStyle}>
        <p>{message}</p>
      </div>
    );
}

export default Alert;

//{type === 'green' ? "#F8D7DA" : "#D4EDDA" },