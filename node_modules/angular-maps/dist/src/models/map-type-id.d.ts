export declare enum MapTypeId {
    /** The aerial map type which uses top-down satellite & airplane imagery. */
    aerial = 0,
    /** A darker version of the road maps. */
    canvasDark = 1,
    /** A lighter version of the road maps which also has some of the details such as hill shading disabled. */
    canvasLight = 2,
    /** A grayscale version of the road maps. */
    grayscale = 3,
    /** The aerial map type including lables */
    hybrid = 4,
    /** Displays a blank canvas that uses the mercator map project. It basically removed the base maps layer. */
    mercator = 5,
    /** Ordnance survey map type (en-gb only). */
    ordnanceSurvey = 6,
    /** Road map type. */
    road = 7,
    /** Provides streetside panoramas from the street level. */
    streetside = 8,
}
