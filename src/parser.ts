import {Identifier, NumericLiteral, Program} from "./ast";
import {Token, tokenize, TokenType} from "./lexer";


export class Parser {
    tokens: Token[];

    constructor() {

    }

    eof() {
        return this.tokens[0].type == TokenType.EOF;
    }

    parse(srcCode: string) {
        this.tokens = tokenize(srcCode);

        let program: Program = {
            kind: "Program",
            body: []
        }

        while (!this.eof()) {
            let token = this.tokens.shift();
            this.parseStmt();
        }
    }

    parseStmt() {
        this.parseExpr();
    }


    parseExpr() {

        let token = this.next();
        const tokenType = token.type;

        switch (tokenType) {
            case (TokenType.Identifier):
                return { kind: "Identifier", symbol: token.value} as Identifier
            case (TokenType.Number):
                return { kind: "NumericLiteral", symbol: parseFloat(token.value)} as NumericLiteral

            default:
                throw "Unexpected token found during parsing."
        }


    }

    private currentToken() {
        return this.tokens[0];
    }

    private next() {
        return this.tokens.shift();
    }
}

