// src/types/Unit.ts
import { MassUnitEnum } from "./MassUnit.enum";
import { VolumeUnitEnum } from "./volumeUnit.enum";

export type UnitEnum = `${MassUnitEnum}/${VolumeUnitEnum}`;
