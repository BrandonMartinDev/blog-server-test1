// -- == [[ UTILS METHODS ]] == -- \\

function CatchErr(err: unknown, prefix?: string) {

    if (err instanceof Error) {
        console.log(`${prefix}: ${err.message}`);
        return;
    }

    console.log(`${prefix}: ${err}`);

}



// -- == [[ EXPORTS ]] == -- \\

export {
    CatchErr
}