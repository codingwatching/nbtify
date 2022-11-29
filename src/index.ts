export * from "./read.js";
export * from "./write.js";
export * from "./primitive.js";
export * from "./tag.js";
export * from "./compression.js";

import { Int } from "./primitive.js";
import type { CompoundTag } from "./tag.js";

export type Endian = "big" | "little";
export type Compression = "gzip" | "zlib";
export type BedrockLevel = Int;

export interface NBTDataOptions {
  name?: string;
  endian?: Endian;
  compression?: Compression | null;
  bedrockLevel?: BedrockLevel | null;
}

/**
 * An object which represents a set of NBT data.
*/
export class NBTData {
  declare readonly data: CompoundTag;
  declare readonly name: string;
  declare readonly endian: Endian;
  declare readonly compression?: Compression;
  declare readonly bedrockLevel?: BedrockLevel;

  constructor(data: CompoundTag | NBTData, { name, endian, compression, bedrockLevel }: NBTDataOptions = {}) {
    if (data instanceof NBTData){
      if (name === undefined) name = data.name;
      if (endian === undefined) endian = data.endian;
      if (compression === undefined) compression = data.compression;
      if (bedrockLevel === undefined) bedrockLevel = data.bedrockLevel;
      data = data.data;
    }

    if (name === undefined) name = "";
    if (endian === undefined) endian = "big";
    if (compression === undefined) compression = null;
    if (bedrockLevel === undefined) bedrockLevel = null;

    if (typeof data !== "object"){
      throw new TypeError("First parameter must be an object");
    }
    if (typeof name !== "string"){
      throw new TypeError("Name option must be a string");
    }
    if (endian !== "big" && endian !== "little"){
      throw new TypeError("Endian option must be a valid endian type");
    }
    if (compression !== null && compression !== "gzip" && compression !== "zlib"){
      throw new TypeError("Compression option must be a valid compression type");
    }
    if (bedrockLevel !== null && !(bedrockLevel instanceof Int)){
      throw new TypeError("Bedrock level option must be an Int");
    }

    this.data = data;
    this.name = name;
    this.endian = endian;
    if (compression !== null) this.compression = compression;
    if (bedrockLevel !== null) this.bedrockLevel = bedrockLevel;

    Object.freeze(this);
  }

  get [Symbol.toStringTag]() {
    return "NBTData" as const;
  }
}