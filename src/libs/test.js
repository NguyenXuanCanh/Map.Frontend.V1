var polyline = require('@mapbox/polyline');

export const test_out=polyline.toGeoJSON(
    // "gkt`A{a_jSFAXI`A[z@YRvADZTfBd@nDFJLdA|AIlBIr@EfCG`@jFf@`FNjBBJ@L@PD`@BPDj@nCYdBSVdCZCtD?C_BCeAAoAA[?_AAk@?SAg@AgAAoACoAAk@GgCAQAQCgCC{AxB?pAA?pAxA?R?r@DbAFd@HXFNe@Hw@?i@EYYw@c@w@[w@Me@Ik@Cm@@WFq@Ji@Vu@N[Xc@Za@`@I^ER?n@hCpAjF`BdHfAnEl@~BDNb@~AX~@~AvD|CfGlEnJhGhMRKwG}MkAmCkE}IeCqFc@iAq@}BHC]oAgCaKx@OfAKp@@tBLb@DTBNHJJDJDr@DPh@j@r@v@z@t@v@f@V`@R`@JCk@gAKUnAe@nAk@oAj@oAd@Qa@y@kB_@_AIUGOGOM]HUFGrAm@TO\\[LUL]ZiAFUZy@Pc@N[DO?]Gu@|@Mv@Ix@Ix@KdAKYiCeAJw@Fy@Jx@Kv@GYgDcA@m@A{@Ay@?Iu@O{AQuAQsBGk@CSM_AIs@Ks@Eg@OwAGe@Is@Ik@lFLrF@tJErBChA@dACh@GXE\\ERENCn@WhB}@`Aq@nBmAlAu@|@q@rAaALIIMKFQN]gA]aAY_AoAmE}A_DqAyCcCeGsD_J{@oCgARm@~@l@_AfASeAgDyAXmBHmDQlDPlBIxAYcBmFq@qBmBoFk@gAW]O]bAs@t@aAl@w@j@u@qBqDWJkAf@u@Z{Ar@}FhCm@XuAn@z@rB[s@_@_Aq@XcAb@cAb@c@Ta@RuAr@qB|@}@`@`CpFv@dBDH~CjHtBzEDLb@`A\\v@~@tBVl@BDRh@L`@Z|@Rh@\\fANf@Pn@FVLr@^hBb@`CNfAPhAFp@D^Db@Jv@Fr@NlADb@Df@rAOnBSpAMfAKf@|EHd@gNBuD?gEGiBMmEK_@AGAyCMmBEgCE}AGw@GaFSyDIiAEM?OD{ACc@KgFMqACyAAm@AwDEQ@wAPaBTiBVsEn@eBTWGODEDEJ?H@FFHLFH?VtCBRXvBbArIN|AJv@d@nEj@rEXdBFdANdA^rD}Ah@y@TG@"
    "i|r`Aq}~iSuAC@vBWPQF}CZ_Dv@{@RkAGe@EyA@m@BsABcCD_CF[@sBDA?MaA@CFM_@eD]wCKcAQ@C?}@X]Ja@LWHIB"
    )

export function stringToGETJSON(string){
    return polyline.toGeoJSON(string);
}