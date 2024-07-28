// -- == [[ UTILS METHODS ]] == -- \\

function CatchErr(err: unknown, prefix?: string) {

    if (err instanceof Error) {
        console.log(`${prefix || "ERROR"}: ${err.message}`);
        return;
    }

    console.log(`${prefix || "ERROR"}: ${err}`);

}



// -- == [[ EXPORTS ]] == -- \\

export {
    CatchErr
}