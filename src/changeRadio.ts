// imports
import * as vscode from "vscode";
import { appName, getMediaPlayer } from "./utilities";
import { playStream, stopStream } from "./stream";
import { getCurrentRadio } from "./changeSurah";
import { radios } from "./surahsAndReciters";
// constants

let currentRadio =
  vscode.workspace.getConfiguration(appName).get("currentradio") ||
  "https://qurango.net/radio/tarateel";
// variables
export let startCommand = `"${getMediaPlayer()}" ${currentRadio} --intf dummy`;

// functions
/**
 * Choose from multiple radio stations.
 */
export async function changeRadio() {
  const radio = await vscode.window.showQuickPick(radios, {
    placeHolder: "Select a radio",
  });
  if (radio) {
    currentRadio = (await getCurrentRadio(radio)) || currentRadio;
  }
  //save the current radio to the global settings
  vscode.workspace
    .getConfiguration(appName)
    .update("currentradio", currentRadio, true);

  vscode.window.showInformationMessage("Current radio is: " + radio);
  startCommand = `"${getMediaPlayer()}" ${currentRadio} --intf dummy`;
  // play the radio when chosen
  stopStream();
  playStream();
}
