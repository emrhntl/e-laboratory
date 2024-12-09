// src/types/Unit.ts
import { MassUnitEnum } from "./massUnit.enum";
import { VolumeUnitEnum } from "./volumeUnit.enum";

export type UnitEnum = `${MassUnitEnum}/${VolumeUnitEnum}`;
