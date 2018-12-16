package com.example.albaazcona.myapplication;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.os.StrictMode;

import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());

        setupGlobalCookieStorage();
        setupContentContainer();
        setupWebView();
    }

    private void setupGlobalCookieStorage() {
        CookieManager.setAcceptFileSchemeCookies(true);
        CookieManager.getInstance().setAcceptCookie(true);
    }

    private void setupContentContainer() {
        setContentView(R.layout.activity_main);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }

    private void setupWebView() {
        final WebView webView = locateIndexWebView();

        setupWebViewCookieStorage(webView);
        setupWebViewSettings(webView);
        setupWebViewContent(webView);
    }

    private WebView locateIndexWebView() {
        return (WebView) findViewById(R.id.webview);
    }

    private void setupWebViewCookieStorage(final WebView webView) {
        if (Build.VERSION.SDK_INT >= 21) {
            CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);
        }
    }

    private void setupWebViewSettings(final WebView webView) {
        final WebSettings webSettings = webView.getSettings();

        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setSupportZoom(false);
    }

    private void setupWebViewContent(final WebView webView) {
        webView.loadDataWithBaseURL("file:///android_asset/", getIndexHtml(), "text/html", "utf-8", "about:blank");
    }

    private String getIndexHtml() {
        try (InputStream is = getAssets().open("index.html")) {
            return IOUtils.toString(is);
        } catch (IOException e) {
            Log.e("IndexHtmlLoader", "Failed to load the index html.", e);

            throw new RuntimeException("Failed to load the index html.");
        }
    }
}
