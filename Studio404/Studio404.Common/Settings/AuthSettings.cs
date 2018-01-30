﻿namespace Studio404.Common.Settings
{
    public class AuthSettings
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Key { get; set; }
        public int Lifetime { get; set; }

		public AuthGoogleSettings AuthGoogleSettings { get; set; }
		public AuthTwitterSettings AuthTwitterSettings { get; set; }
	}

	public class AuthGoogleSettings
	{
		public string ClientId { get; set; }
		public string ClientSecret { get; set; }
	}

	public class AuthTwitterSettings
	{
		public string ConsumerKey { get; set; }
		public string ConsumerSecret { get; set; }
	}
}