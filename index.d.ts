// Type definitions for body-parser 1.19
// Project: https://github.com/expressjs/body-parser
// Definitions by: Santi Albo <https://github.com/santialbo>
//                 Vilic Vane <https://github.com/vilic>
//                 Jonathan Häberle <https://github.com/dreampulse>
//                 Gevik Babakhani <https://github.com/blendsdk>
//                 Tomasz Łaziuk <https://github.com/tlaziuk>
//                 Jason Walton <https://github.com/jwalton>
//                 Piotr Błażejewicz <https://github.com/peterblazejewicz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import type { NextFunction, Response, Request } from "express"

export interface JsonOptions {
    /**
     * Controls the maximum request body size. If this is a number,
     * then the value specifies the number of bytes; if it is a string,
     * the value is passed to the bytes library for parsing. Defaults to '100kb'.
     */
    limit?: number | string
}

export declare function json(options?: JsonOptions): (req: Request, res: Response, next: NextFunction) => void

export declare function urlencoded(): (req: Request, res: Response, next: NextFunction) => void
