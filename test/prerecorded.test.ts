import { assert, expect } from "chai";
import { createClient } from "../src";
import { faker } from "@faker-js/faker";
import { bufferSource, urlSource } from "./mocks";
import DeepgramClient from "../src/DeepgramClient";
import { CallbackUrl } from "../src/lib/helpers";

describe("making listen requests", () => {
  let deepgram: DeepgramClient;

  beforeEach(() => {
    deepgram = createClient(faker.string.alphanumeric(40), {
      global: { url: "https://deepgram-mock-api-server.fly.dev" },
    });
  });

  it("should create the client object", () => {
    expect(deepgram).to.not.be.undefined;
    expect(deepgram).is.instanceOf(DeepgramClient);
  });

  it("should transcribe a URL source synchronously", async () => {
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(urlSource);

    assert.isNull(error);
    assert.isNotNull(result);
    assert.containsAllDeepKeys(result?.metadata, ["request_id"]);
  });

  it("should transcribe a file source synchronously", async () => {
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(bufferSource);

    assert.isNull(error);
    assert.isNotNull(result);
    assert.containsAllDeepKeys(result?.metadata, ["request_id"]);
  });

  it("should transcribe a URL source asynchronously", async () => {
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrlCallback(
      urlSource,
      new CallbackUrl("https://example.com/callback")
    );

    assert.isNull(error);
    assert.isNotNull(result);
    assert.containsAllDeepKeys(result, ["request_id"]);
  });

  it("should transcribe a file source asynchronously", async () => {
    const { result, error } = await deepgram.listen.prerecorded.transcribeFileCallback(
      bufferSource,
      new CallbackUrl("https://example.com/callback")
    );

    assert.isNull(error);
    assert.isNotNull(result);
    assert.containsAllDeepKeys(result, ["request_id"]);
  });
});
