package com.byteperday.teashop;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.content.Context;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.NotificationChannel;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Step 1: Allow edge-to-edge drawing so we can control insets manually
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        // Step 2: Set status bar + nav bar colors
        getWindow().setStatusBarColor(Color.parseColor("#1e3d2f"));
        getWindow().setNavigationBarColor(Color.WHITE);

        // Step 3: Dynamically detect exact status bar / nav bar height per device
        // and apply that as padding to the root content view
        View rootView = findViewById(android.R.id.content);
        ViewCompat.setOnApplyWindowInsetsListener(rootView, (view, windowInsets) -> {
            Insets insets = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars()
            );
            // Apply padding so WebView content never goes behind system bars
            view.setPadding(
                insets.left,   // left (handles RTL / edge cutouts)
                insets.top,    // top  = status bar height (dynamic per device)
                insets.right,  // right
                insets.bottom  // bottom = nav bar height (dynamic per device)
            );
            return WindowInsetsCompat.CONSUMED;
        });
        // Register a simple JavaScript interface on the WebView so the web code
        // can request a persistent notification without depending on Capacitor
        // annotation-based plugins. This avoids build issues on some setups.
        try {
            // getBridge() is provided by BridgeActivity; this returns the Capacitor bridge
            if (this.getBridge() != null && this.getBridge().getWebView() != null) {
                android.webkit.WebView webView = (android.webkit.WebView) this.getBridge().getWebView();
                webView.addJavascriptInterface(new LocationNotifierInterface(), "AndroidLocationNotifier");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    // Simple JS interface to show/clear notifications from JavaScript
    public class LocationNotifierInterface {
        private static final String CHANNEL_ID = "teashop_location_channel";
        private static final int NOTIFICATION_ID = 45721;
        private static final int SIMPLE_NOTIFICATION_ID = 45722;

        @android.webkit.JavascriptInterface
        public void show(final String title, final String text) {
            runOnUiThread(() -> {
                Context ctx = MainActivity.this.getApplicationContext();
                NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                    NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Location", NotificationManager.IMPORTANCE_LOW);
                    channel.setDescription("Location sharing is active");
                    channel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PRIVATE);
                    nm.createNotificationChannel(channel);
                }

                int iconRes = ctx.getApplicationInfo().icon;
                Notification.Builder builder;
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                    builder = new Notification.Builder(ctx, CHANNEL_ID);
                } else {
                    builder = new Notification.Builder(ctx);
                }
                builder.setContentTitle(title != null ? title : "Location Active")
                       .setContentText(text != null ? text : "Sharing your location")
                       .setSmallIcon(iconRes)
                       .setOngoing(true)
                       .setPriority(Notification.PRIORITY_LOW);

                nm.notify(NOTIFICATION_ID, builder.build());
            });
        }

        @android.webkit.JavascriptInterface
        public void clear() {
            runOnUiThread(() -> {
                NotificationManager nm = (NotificationManager) MainActivity.this.getApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);
                nm.cancel(NOTIFICATION_ID);
            });
        }

        // One-time simple notification (e.g. cart updated, order placed)
        @android.webkit.JavascriptInterface
        public void showSimple(final String title, final String text) {
            runOnUiThread(() -> {
                Context ctx = MainActivity.this.getApplicationContext();
                NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                    NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Location", NotificationManager.IMPORTANCE_DEFAULT);
                    channel.setDescription("TeaShop notifications");
                    nm.createNotificationChannel(channel);
                }

                int iconRes = ctx.getApplicationInfo().icon;
                Notification.Builder builder;
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                    builder = new Notification.Builder(ctx, CHANNEL_ID);
                } else {
                    builder = new Notification.Builder(ctx);
                }
                builder.setContentTitle(title != null ? title : "TeaShop")
                       .setContentText(text != null ? text : "New activity in app")
                       .setSmallIcon(iconRes)
                       .setAutoCancel(true)
                       .setPriority(Notification.PRIORITY_DEFAULT);

                nm.notify(SIMPLE_NOTIFICATION_ID, builder.build());
            });
        }
    }
}
