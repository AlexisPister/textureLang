
export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen,
    CloseParen,
    BinaryOperator,
    Let,

    EOF // End of File
}

export interface Token {
    value: string,
    type: TokenType
}


const BINARY_OPERATORS = ["=", "+", "*"];
const SKIPPABLE = [" ", "\t", "\n"];
const KEYWORDS: Record<string, TokenType> = {
    "let": TokenType.Let
}


export function tokenize(sourceCode: string) : Token[] {
    const tokens = new Array<Token>;
    const src = sourceCode.split("");

    while (src.length > 0) {
        let token: Token;
        if (src[0] == "(") {
            token = initToken(src.shift(), TokenType.OpenParen);
        } else if (src[0] == ")") {
            token = initToken(src.shift(), TokenType.CloseParen);
        } else if (BINARY_OPERATORS.includes(src[0])) {
            token = initToken(src.shift(), TokenType.BinaryOperator);
        } if (src[0] == "=") {
            token = initToken(src.shift(), TokenType.Equals);
        } else {
            // Multi characters tokens

            // Build number token
            if (isInt(src[0])) {
                let num = "";
                while (src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                }

                token = initToken(num, TokenType.Number);
            } else if (isalpha(src[0])) {

                let ident = "";
                while (src.length > 0 && isalpha(src[0])) {
                    ident += src.shift();
                }

                // check for reserved tokens
                const reserved = KEYWORDS[ident];
                if (reserved == undefined) {
                    token = initToken(ident, TokenType.Identifier);
                } else {
                    token = initToken(ident, reserved);
                }
            } else if (isSkippable(src[0])) {
                // Skip he current character
                src.shift();
            } else {
                console.log("Unrecognized character: ", src[0]);
            }

        }

        tokens.push(token);
    }

    tokens.push(initToken("EndOfFile", TokenType.EOF));
    return tokens;
}

function initToken(value: string, tokenType: TokenType) : Token {
    let token = {
        value: value,
        type: tokenType
    }
    return token;
}

function isalpha(src: string) {
    return src.toUpperCase() != src.toLowerCase();
}

function isInt(char: string) {
    const c = char.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

function isSkippable(str: string) {
    return SKIPPABLE.includes(str);
}