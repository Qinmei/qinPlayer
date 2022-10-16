import { useStore } from "@yuanjs/common";
import React from "react";
import { Player } from "./video";

interface PropsType {
    player: Player
}

export const Core: React.FC<PropsType> = props => {
    const { player } = props;

    const [state] = useStore(player.store)

    return <video
        src={state.source}
        // poster={poster}
        // preload={preload}
        // autoPlay={autoplay}
        // loop={loop}
        controls={false}
        onLoadStart={player.onLoadStart}
        onDurationChange={player.onDurationChange}
        onLoadedMetadata={player.onLoadedMetadata}
        onLoadedData={player.onLoadedData}
        onProgress={player.onProgress}
        onCanPlay={player.onCanPlay}
        onCanPlayThrough={player.onCanPlayThrough}
        onPlaying={player.onPlaying}
        onPause={player.onPause}
        onTimeUpdate={player.onTimeUpdate}
        onWaiting={player.onWaiting}
        onEmptied={player.onEmptied}
        onEncrypted={player.onEncrypted}
        onEnded={player.onEnded}
        onError={player.onError}
        onPlay={player.onPlay}
        onRateChange={player.onRateChange}
        onSeeked={player.onSeeked}
        onSeeking={player.onSeeking}
        onAbort={player.onAbort}
        onStalled={player.onStalled}
        onSuspend={player.onSuspend}
        onVolumeChange={player.onVolumeChange}
    ></video>
}