
const MessageFormatter = ( message ) => {

    if(!message) return "";
    
    message = message
        .replace(/^(\n\n|\.\n\n|\.\n)/, '')
        .replace(/Ingredientes/i,"𝗜𝗻𝗴𝗿𝗲𝗱𝗶𝗲𝗻𝘁𝗲𝘀")
        .replace(/Modo de preparo/i,"𝗠𝗼𝗱𝗼 𝗱𝗲 𝗽𝗿𝗲𝗽𝗮𝗿𝗼");

    return <span className="whitespace-pre-line">{message}</span>;
    
}

export default MessageFormatter;