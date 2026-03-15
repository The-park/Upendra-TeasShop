package com.byteperday.teashop;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.PluginMethod;

@CapacitorPlugin(name = "LocationNotifier")
public class LocationNotifierPlugin extends Plugin {
    private static final String CHANNEL_ID = "teashop_location_channel";
    private static final int NOTIFICATION_ID = 45721;

    @PluginMethod
    public void show(PluginCall call) {
        String title = call.getString("title", "Location Active");
        String text = call.getString("text", "Sharing your location");

        createChannelIfNeeded();

        Context ctx = getContext();
        Notification.Builder builder;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            builder = new Notification.Builder(ctx, CHANNEL_ID);
        } else {
            builder = new Notification.Builder(ctx);
        }

        // Use app icon as small icon
        int iconRes = ctx.getApplicationInfo().icon;

        builder.setContentTitle(title)
                .setContentText(text)
                .setSmallIcon(iconRes)
                .setOngoing(true)
                .setPriority(Notification.PRIORITY_LOW);

        Notification n = builder.build();
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.notify(NOTIFICATION_ID, n);

        JSObject ret = new JSObject();
        ret.put("notified", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void clear(PluginCall call) {
        NotificationManager nm = (NotificationManager) getContext().getSystemService(Context.NOTIFICATION_SERVICE);
        nm.cancel(NOTIFICATION_ID);
        call.resolve();
    }

    private void createChannelIfNeeded() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager nm = (NotificationManager) getContext().getSystemService(Context.NOTIFICATION_SERVICE);
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Location", NotificationManager.IMPORTANCE_LOW);
            channel.setDescription("Location sharing is active");
            channel.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
            nm.createNotificationChannel(channel);
        }
    }
}
