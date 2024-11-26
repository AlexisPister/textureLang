import {Parser} from "./src/parser";


function repl() {

    let parser = new Parser();

    console.log("Repl 0.1\n");

    while (true) {
        const input = prompt(">");

        if (!input || input == "exit") {
            process.exit();
        }

        const ast = parser.parse(input);
        console.log(ast);

    }
}

repl();